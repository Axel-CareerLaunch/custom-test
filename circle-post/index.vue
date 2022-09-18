<!-- put your html markup in the template tag -->
<template>
  <div>
    <v-card v-if="!ctx.taking">
      <v-card-text>
        
        <div class="circle-post-instructions">
          <h3>Instructions</h3>
          <p><i>Note: These instructions will not show while taking the lesson.</i><p>
          
          <p>Under this item's dropdown, click on settings then add the following to metadata.</p>
          
          <img src="https://p194.p3.n0.cdn.getcloudapp.com/items/GGuzqPQX/39e0574d-6192-4d66-aa4d-c509de9c0051.jpg?v=e353157bbb5576de59f997213236da1e"/>

          <table>
            <tr><th>circle_domain</th><td>The full domain (without https://) where your circo.so is hosted.</td></tr>
            <tr><th>circle_space</th><td>The slug of the circle space the post resides in.</td></tr>
            <tr><th>circle_post</th><td>The slug of the circle post</td></tr>
          </table>
          
        </div>

      </v-card-text>
    </v-card>
    <div v-if="circleUrl">
      <iframe 
        ref="iframe" 
        :style="frameStyles" 
        style="border:0;box-shadow:none;outline:0;" 
        :src="circleUrl" scrolling="no" width="100%">
      </iframe>
    </div>
  </div>
</template>

<!-- put your javascript / vue.js logic into your script tag -->
<!-- lang='es6' is important. Please include -->
<script lang='es6'>

  //your code should be exported using the module.exports object
  module.exports = {
    
    //give your custom code component a unique name, no spaces, camelCase
    name : 'CirclePost',

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
        ready: false,
        frameStyles: {
          height: '200vh'
        }
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
        this.dialog = false
        this.$emit('completed')
      },

      listenForEvents(){
        
         window.addEventListener('message', e => {

          console.log(e.data);

          if( this.circleUrl.indexOf(e.origin) === -1 ){
            return false;
            // return console.log('filtered window.message event', e)
          }

          if( Array.isArray(e.data) && e.data[0] === 'setHeight' && e.data[1] ){
            this.frameStyles.height = e.data[1] + 'px';
          }          
          
        })
        
      },

    },

    computed: {
      learner(){
        return this.ctx.learner
      },
      metadata(){
        //metadata iframe_url and button_text are 
        return this.ctx?.currentItem?.values?.metadata || {}
      },
      circleDomain(){
        return this.metadata.circle_domain
      },
      circleSpace(){
        return this.metadata.circle_space
      },
      circlePost(){
        return this.metadata.circle_post
      },
      circleUrl(){
        let domain = this.circleDomain
        let space = this.circleSpace
        let post = this.circlePost

        if( !domain || !space  || !post ){
          return ''
        }

        return `https://${domain}/c/${space}/${post}?iframe=true&post=true`
      },

    },

    //DO NOT REMOVE. This emits to the parent lesson that your custom code is fully loaded
    mounted(){
      this.$emit('loaded')
      this.listenForEvents()
      setTimeout(() => {
        this.ready = true;
      }, 100)
    },

  }
</script>

<!-- put your styles in the style tag. -->
<style>
 .circle-post-instructions {
    padding:10px;
    border:1px dashed #ccc;
    margin-bottom:10px
  }
</style>