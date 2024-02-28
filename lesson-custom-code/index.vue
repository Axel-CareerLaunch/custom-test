<!-- put your html markup in the template tag -->
<template>
  <div class="custom-code-sample">
    
  </div>
</template>

<!-- put your styles in the style tag. -->
<style>
  .app-header {
    display: none !important;
  }

  .take-lesson__controls {
    display: none !important;
  }
  
  .custom-code-sample {
    font-size: 16px;
  }
  
</style>

<!-- put your javascript / vue.js logic into your script tag -->
<!-- lang='es6' is important. Please include -->
<script lang='es6'>

  //your code should be exported using the module.exports object
  module.exports = {
    
    //give your custom code component a unique name, no spaces, camelCase
    name : 'clraReporting',

    //props are properties passed from the parent lesson context
    //into your component. Please always include this line
    //@ctx = the lesson context object
    //@ui = all of the ui vue components (see beforeMount)
    //@api = methods exposed to your code like updateLearner() giving you the ability 
    //       to update a learner's profile in ConveYour from YOUR code
    props : [ 'ctx', 'ui', 'api' ],

    //the data function must return an object. Data values
    //return here can be used in your templates like this Hi {{fullName}}
    data(){
      return {
        fullName : [ 
          this.ctx.learner.first_name, 
          this.ctx.learner.first_name 
        ].join(' '),
        careerSelfDevelopment1 : [
          this.ctx.learner.career_self_development_1st
        ],

        communication1 : [
          this.ctx.learner.communication_1st
        ],

        criticalThinking1 : [
          this.ctx.learner.critical_thinking_1st
        ],

        equityInclusion1 : [
          this.ctx.learner.equity_inclusion_1st
        ],

        leadership1 : [
          this.ctx.learner.leadership_1st
        ],

        professionalism1 : [
          this.ctx.learner.professionalism_1st
        ],

        teamwork1 : [
          this.ctx.learner.teamwork_1st
        ],

        technology1 : [
          this.ctx.learner.technology_1st
        ],

        overallScore1 : [
          this.ctx.learner.overall_score_1st
        ]
      }
    },

    //this attaches the parent lesson ui components to your custom code
    //so that you can use built in lesson vue components in YOUR code!
    beforeMount(){
      this.$options.components = this.ui
    },

    //methods are actions that occur as a result of clicking on items
    //see @click='complete' on the complete button in the template
    methods: {
      //emit an event to the parent lesson telling the lesson that the learner
      //interacting with this code has completed the interaction. By giving you
      //the power to signal when the learner is completed you can control the learner's
      //ability to progress through the rest of the lesson!
      complete(){
        this.$emit('completed')
      }
    },

    

    //DO NOT REMOVE. This emits to the parent lesson that your custom code is fully loaded
    mounted(){
      this.$emit('loaded')
    },

  }
</script>