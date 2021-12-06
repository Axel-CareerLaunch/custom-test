<!-- put your html markup in the template tag -->
<template>
  <div class="custom-code-sample">
    <v-card>
      <v-card-text>
        <v-btn color="primary" @click="dialog = true">{{buttonText}}</v-btn>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
      <v-card-text>
        <v-icon class="close" @click="dialog = false">close</v-icon>

        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary">
        </v-progress-linear>

        <iframe :src="iframeUrl"></iframe>

      </v-card-text>
          
      </v-card>
    </v-dialog>
  </div>
</template>

<!-- put your javascript / vue.js logic into your script tag -->
<!-- lang='es6' is important. Please include -->
<script lang='es6'>

  //your code should be exported using the module.exports object
  module.exports = {
    
    //give your custom code component a unique name, no spaces, camelCase
    name : 'CustomIframe',

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
        loading: true,
        dialog : false,
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
          
          if( this.iframeUrl.indexOf(e.origin) === -1 ){
            return console.log('filtered window.message event', e)
          }

          const event = typeof e.data === 'object' ? e.data.event : e.data

          if( event === 'loaded' ){
            return this.loading = false
          }

          if( event === 'completed' ){
            return this.complete()
          }
          
          
        })
      },

    },

    computed: {
      learner(){
        return this.ctx.learner
      },
      metadata(){
        return this.ctx.currentItem.values.metadata || {}
      },
      iframeUrl(){
        return this.metadata.iframe_url
      },
      buttonText(){
        return this.metadata.button_text || 'View Page'
      }
    },

    //DO NOT REMOVE. This emits to the parent lesson that your custom code is fully loaded
    mounted(){
      this.$emit('loaded')
      this.listenForEvents()
    },

  }
</script>

<!-- put your styles in the style tag. -->
<style>


  iframe{
    position: absolute;
    border: none;
    width: 100%;
    height: calc(100% - 40px);
    top:40px;
    box-shadow: 0px 2px 4px rgba(35, 55, 79, 0.24);
    background-color: #fff;
  }

  .close{
    position: absolute !important;
    right:0px;
    top:0px;
    padding:10px;
  }

  .v-dialog{
    height: 100vh;
    position: relative;
  }

  .v-dialog .v-card{
    height: 100%;
    padding:0
  }

  .v-dialog .v-card__text{
    height: 100%;
    padding:0 !important;
  }
</style>