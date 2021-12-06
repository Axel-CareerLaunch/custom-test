# ConveYour Custom Content Examples

## Introduction

### What is Custom Content? 
ConveYour's Microlearning Lessons system supports creating *custom* learner engagements through a simple single VueJS template system. 

We have a full introduction video in our [ConveYour Video Gallery](https://about.conveyour.com/videos/custom-content),

[![](https://p194.p3.n0.cdn.getcloudapp.com/items/yAu0Ezbk/be271db7-2918-4118-b9ec-055ea91f81b5.jpg?v=d2c333564637e9aceb4606596995f5e3)](https://about.conveyour.com/videos/custom-content)

### What is in this Git Project?

This project consists of an ever growing list of custom content "widgets" that you can try out yourself or use in your ConveYour training! 

- Custom Examples
- Super light-weight node server for serving the widget!

## Getting Started

Check out this [quick tutorial](https://vimeo.com/653847203/02cc502425) video on how to use this git project. 

[![](https://p194.p3.n0.cdn.getcloudapp.com/items/geupNNen/80f4e840-49ae-4ac4-b6fb-e940a89be88c.jpg?v=96b05381cbabe445b67b76a60358cfcd)](https://vimeo.com/653847203/02cc502425)

### Clone the Repo

`git clone git@github.com:ConveYour/conveyour-custom-content-examples.git`

### Enter Project
`cd conveyour-custom-content-examples`

### Use [mkcert](https://github.com/FiloSottile/mkcert) to generate an ssl cert you can use with localhost domain

Serving your Custom Content "widgets" via https ensures that CORS will work correctly. ConveYour will need to be able to retrieve your custom widget via a URL (localhost or on a domain) which is a cross-domain request. 

### Start the Server

`npm run server`
