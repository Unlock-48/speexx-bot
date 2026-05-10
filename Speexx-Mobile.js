// ==UserScript==
// @name         Speexx Auto Solve
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Automatically solve Speexx exercises - Educational purpose
// @author       Educational Bot
// @match        https://portal.speexx.com/*
// @match        https://portal.speexx.cn/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function initBot() {
        if (window.Backbone && window.Backbone.Speexx && !window.botInstalled) {
            window.botInstalled = true;

            CourseWare.CourseExercises.CourseExercisesControlsView = Backbone.Speexx.HandlebarsView.extend({
                templateName: "cw-language-course-controls",
                className: "exercise-controls",
                initialize: function (config) {
                    var exerciseView = this.exerciseView = config.exerciseView,
                        model = exerciseView.model;
                    
                    this.firstTime = true;
                    this.solutionShown = false;
                    this.modified = false;
                    this.dialogEnded = false;
                    
                    this.listenTo(exerciseView, "modified", function () {
                        if (!this.modified) {
                            this.modified = true;
                            this.render();
                        }
                    });
                    
                    this.listenToOnce(exerciseView, "dialog:ended", function () {
                        this.dialogEnded = true;
                        this.render();
                    });
                    
                    this.listenTo(exerciseView, "static:added static:removed", this.render);
                    
                    this.listenTo(model, "sync", function (model, response, options) {
                        var wasSilent = !!this.silent;
                        this.silent = !!options.silent;
                        if (!this.silent || !wasSilent) {
                            this.render();
                        }
                    });
                    
                    this.listenTo(CourseWare.Language, "change:textpool", this.render);
                    
                    this.on("render:after", function () {
                        this.$(".btn.btn-link[title]").tooltip();
                    });

                    window.entryp = this;
                    startAutoSolveSequence();
                },
                
                templateModel: function () {
                    var exerciseView = this.exerciseView,
                        model = exerciseView.model,
                        result = this.silent ? null : model.get("result"),
                        type = model.get("type"),
                        hasCorrect = !exerciseView.static && type.hasResult && !type.pronunciation,
                        hideResult = exerciseView.static || !type.hasResult,
                        showSolution = !this.solutionShown && hasCorrect && !this.firstTime && result !== 100;

                    return {
                        firstTime: this.firstTime,
                        hasCorrect: hasCorrect,
                        hasSolution: showSolution,
                        hideResult: hideResult,
                        dialogEnded: this.dialogEnded,
                        modified: this.modified,
                        solutionShown: this.solutionShown,
                        result: result
                    };
                },
                
                events: {
                    "click .btn.correct": function () {
                        CourseWare.Audio.stop();
                        this.trigger("correct");
                    },
                    "click .btn.repeat": function () {
                        this.exerciseView.model.get("staticBefore") ? 
                            this.exerciseView.setStatic() : 
                            this.exerciseView.render();
                    },
                    "click .btn.next": function () {
                        this.trigger("next");
                    },
                    "keypress .btn.next": function (event) {
                        event.preventDefault();
                        if (event.originalEvent.charCode === 13 || event.originalEvent.charCode === 32) {
                            this.trigger("nextKeyboard");
                        }
                    },
                    "click .btn.solution": function () {
                        this.render();
                        this.trigger("solve");
                    }
                }
            });
        }
    }

    function startAutoSolveSequence() {
        if (!window.entryp) return;

        window.entryp.trigger("correct");
        console.log("Step 1: Correct triggered");

        setTimeout(() => {
            window.entryp.trigger("solve");
            console.log("Step 2: Solve triggered");
        }, 1500);

        setTimeout(() => {
            window.entryp.trigger("correct");
            console.log("Step 3: Correct triggered again");
        }, 4000);

        setTimeout(() => {
            const nextBtn = $(".next");
            if (nextBtn.length > 0) {
                nextBtn.click();
                console.log("Step 4: Next clicked - Moving to next exercise");
            } else {
                console.log("Step 4: Next button not found");
            }
        }, 6000);
    }

    const checker = setInterval(() => {
        if (window.Backbone && window.Backbone.Speexx) {
            console.log("CourseWare detected - Initializing bot");
            initBot();
            clearInterval(checker);
        }
    }, 500);

})();
