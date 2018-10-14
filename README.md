# AngularJsAssignment

## Steps to Run the Web App:
1. Clone the Code in local System.
2. cd AngularJsAssignment
3. Run Command: npm install
4. Run Command: gulp serve

## Features:
### Login:
Username: vinay,
Password: vinay

### Add a Comment:
1. Add a new comment on a post by clicking on comments button.
2. Enter comment in textbox and press enter or hit button

### Like a comment:
1. If user like a comment then status become Liked.
2. If user already liked a comment and then again hit like button then the status become Like(means unlike the comment).
3. Show the total number of Likes on a comment by other user.

### Edit a comment:
1. Edit button only show if user has own comment.
2. On Edit button click the comment textbox will enable to edit and hit enter to update the comment.

### Delete a comment:
User can only delete a comment if user has own comment.

### Reply a comment:
User can reply on own and the other users comments. 

### JSON Struncture:

{
      id:1,
      userId : 1,
      des:`Lorem ipsum dolor sit amet`,
      comments:[
          {
            id :1,
            userId :2,
            des :"Good",
            likes :[
              {
                userId : 1
              }
            ],
            reply:[
              {
                userId :1,
                des :"thanks!!"
              }
            ]
          }
      ]
    }
    
### Business Logic Files:

/src/js/controllers/main.js,/src/views/main.html




