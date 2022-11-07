music="";
music_1="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
statusLeftWrist="";

function preload(){
    music=loadSound("music.mp3");
    music_1=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}
function modelLoaded(){
    console.log("PoseNet is Initialized");

}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    statusLeftWrist=music.isPlaying();
    console.log(statusLeftWrist);

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        music_1.stop();

        if(statusLeftWrist==true){
            music.play();

        }else{
            document.getElementById("song").innerHTML = "Name of the song = Peter Pan song" 
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+scoreLeftWrist)

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+",leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+",rightWristY="+rightWristY);


    }
}

    