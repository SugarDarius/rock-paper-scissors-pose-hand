<h1 align="center">
  <a href="" target="blank" alt="Webapp - Rock Paper Scissors Pose Hand">
    Rock Paper Scissors Pose Hand
  </a>
</h1>

<p align="center">
  Confront yourself against the <a href="https://github.com/tensorflow/tfjs-models/tree/master/handpose">posehand TensorflowJS model</a> at Rock Paper Scissors game
</p>

<p align="center">
  <a href="https://twitter.com/azeldvin">
    <img alt="say" src="https://img.shields.io/badge/say-hi!-blue"/>
  </a>
  <a href="https://twitter.com/azeldvin">  
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/azeldvin?style=social">
  </a>
</p>

## Greetings 👋
Rock Paper Scissors Pose Hand is a webapp to play the classic game "Rock Paper Scissors".<br />
It uses the [TensorflowJS](https://www.tensorflow.org/js) model [posehand](https://github.com/tensorflow/tfjs-models/tree/master/handpose) developed with [Gatsby](https://www.gatsbyjs.org/) with [CharkraUI](https://chakra-ui.com/) and deployed on [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/).

## A word about 💬
This project is still **experimental and under development**. So when using it you may endure issuers or bugs.<br />
The main goal here is to provide users some fun when interacting with an ML model which is here the [TensorflowJS](https://www.tensorflow.org/js) model [posehand](https://github.com/tensorflow/tfjs-models/tree/master/handpose).

Feel free to open issues to increase the efficiency and the of this projet 😀.

## How it works? 🤔
You wanna know how this project works? Here's how!

### ```The ALGO```
The ALGO is and algorithm which is your opponent.<br />
He knows all the hand shapes available (and no the water well shape isn't correct 😇) for a rock paper sciossors game.

His own logic is very simple :<br />
It will take this array as input:
```ts
['rock', 'paper', 'scissors']
```
And then shuffle it with a basic shuffle algorithm to finish with a random selection into the shuffled array.

As you can see for now it's very pretty basic, but maybe in futur I  will complexify the logic to try to define the pattern of the player to block him 😜

### ```You, the player```
Here the things are a little more complex 😁

First, when the incantation READY?, ROCK!, PAPER!, SCISSORS! the webapp has to take a capture of your hand from the camera stream.<br />
Then, the capture is rendered into a ```<canvas />``` html tag to provide you preview of your hand.

After, to make the prediction of which shape is reprensented by your hand, the canvas his analysed by the [posehand](https://github.com/tensorflow/tfjs-models/tree/master/handpose) from [TensorflowJS](https://www.tensorflow.org/js).<br />
This will give the landmarks' coordinates of each fingers from your hand. 

When the model has computed the coordinates I apply a logic to calcutate which fingers are open or not.<br />
Based on this the logic determines which shape is represente by your hand 😀.

## Special thanks 👏
I'd like to thanks [Jen Looper](https://twitter.com/jenlooper) which has gave an amazing talk about [PoseDance](https://proud-moss-070616b1e.azurestaticapps.net/) at [#AskTheExpert](https://twitter.com/ATEOnAir).<br />
Her talk gave me the desire and the inspiration to carry out this project 😊.

<p align="center">
  Made with ❤ by <a href="https://github.com/SugarDarius">SugarDarius</a>
</p>