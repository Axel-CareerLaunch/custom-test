<!-- put your html markup in the template tag -->
<template>
  <div class="custom-code-sample">
    <v-card>
      <v-card-text>
        <h2 class="animated slideInUp">{{ctx.currentItem.metadata.title}}</h2>
        <p>Build custom lesson interactions using HTML, CSS, and Javascript</p>

        <h3>How it works</h3>
        <p>ConveYour Lessons can dynamically load <a target="_blank" href="https://vuejs.org/v2/guide/single-file-components.html">Vue.js Single File Components</a> that you host online. Your custom code will be able to talk to the lesson it resides in and vice versa.
        </p>

        <h3>Why would I use this?</h3>
        <p>If you want to...</p>
        <ul>
            <li>build custom learner experiences and reports.</li>
            <li>embed iframes and other 3rd party widgets.</li>
        </ul>
        <br>
        <h3>Hosting the File (Github.com)</h3>
        <p>GitHub Gist is a free service from GitHub that makes it really easy to create, edit, and host code files. By using a service like this to host your custom code, you can re-use your custom code in many lessons simply by dropping in the URL of your "gist" into the configuration of a custom code lesson item.</p>
        <p>The HTML you are reading right now, is itself, custom code that is being imported into your Lesson 
          <b><a href="https://gist.githubusercontent.com/srhyne/71d8687e27ef5e5e088d6986bb434050/raw/lesson-custom-code.vue" target="_blank">via this URL</b></a>
          This is the same URL that set in the "URL for custom code" field in this item's edit configuration.. <a href="https://gist.github.com/srhyne/71d8687e27ef5e5e088d6986bb434050" target="_blank">Here's the link to the gist's main page if you want to fork the sample.</a>

        <h3>The Template</h3>
        <p>The first tag in the above <b>lesson-custom-code.vue</b> file is the template. The template is where your HTML will go. It's important that your template only has ONE child component.
        </p>

        <h3>The Styles</h3>
        <p>The second tag is the style tag. This tag is where you write your CSS styles. Not the scoped property in the above linked sample. This scopes the CSS to only applying to your custom code.</p>

        <h3>The Script</h3>
        <p>The script is where the magic happens. This is where you can deeply integrate your custom code with the lesson it resides in! <i style="font-weight: bold">Please review the comments in the sample linked above to understand the structure of the JavaScript code.</i></p>

        <h5>The "ctx" prop</h5>
        <p>The ctx prop in the sample script above is a JavaScript object that provides your custom code a bunch of context about the learner taking the lesson and their progress, as well information about the lesson itself. Also, we include some organizational information as well. </p>

        <p>Check it out! Want to see what the ctx property has stored in it right now?</p>
        <v-btn @click="ctxHidden = !ctxHidden" color="primary">
          <span v-if="ctxHidden">View ctx property values</span>
          <span v-else>Hide ctx values</span>
        </v-btn>
        <pre v-if="!ctxHidden">{{ctx}}</pre>

        <h5 style="margin-top: 20px">Example of ctx Property Use</h5>
        <p>Hi {{learner.first_name}}! Here's your progress so far!</p>
        <h1 class="animated lightSpeedIn">Score: {{ctx.lessonStats.points}}</h1>
        <h1 class="animated lightSpeedIn">Completion: {{ctx.lessonStats.completedPerc}}%</h1>
        <h5 style="margin-top: 20px">Completion</h5>
        <p>Custom code creators have the ability to block the advancement of a lesson by choosing when to "emit" the "completed" event. Under methods in this sample, you will see a "complete" method that "emits" the "completed" event to the parent lesson only when you click the complete button below.</p>
        <v-btn color="primary" @click="complete">complete</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<!-- put your styles in the style tag. -->
<style scoped>
  .custom-code-sample p, .custom-code-sample ul{
    font-size: 16px;
  }
</style>

<!-- put your javascript / vue.js logic into your script tag -->
<!-- lang='es6' is important. Please include -->
<script lang='es6'>

  //your code should be exported using the module.exports object
  module.exports = {
    
    //give your custom code component a unique name, no spaces, camelCase
    name : 'CustomCodeSample',

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
        ctxHidden : true,
        fullName : [ 
          this.ctx.learner.first_name, 
          this.ctx.learner.first_name 
        ].join(' ')
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

    computed: {
      learner(){
        return this.ctx.learner
      },
      stress1(){
        return this.ctx.lesson.items.filter( l => {
          return l.metadata === 'stress'
        })
      },
      lesson1Points(){
        let points = 0
        this.stress1.forEach( i => {
          points += i.engagementState.points
        })
        return points
      }
    },

    //DO NOT REMOVE. This emits to the parent lesson that your custom code is fully loaded
    mounted(){
      this.$emit('loaded')
    },

  }
</script>