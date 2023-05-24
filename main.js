// alert('Hi Javascript basic')

// console.log(document);
// var fullName = 'Dang Ngoc Son'
// alert(fullName)

// var headingNode = document.getElementById('heading')
// console.log({
//     Element: headingNode
// });

// setTimeout(function() {
//     console.log(1);
// }, 1000);

// console.log(2);

var users = [
    {
        id: 1,
        name: 'Kien Dam',
    },
    {
        id: 2,
        name: 'Son Dang',
    },
    {
        id: 3,
        name: 'Hung Dam',
    },
];
var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Anh Son chua ra video :('
    },
    {
        id: 2,
        user_id: 2,
        content: 'Vua ra xong em oi!'
    }
];
function getComments() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(comments);
        }, 1000);
    });
}
function getUsersByIds(userIds) {
    return new Promise(function(resolve) {
        var result = users.filter(function(user) {
            return userIds.includes(user.id)
        });
        setTimeout(function() {
            resolve(result);
        }, 1000);
        
    }, 1000);
}
getComments() 
    .then(function(comments) {
        var userIds = comments.map(function(comment) {
             return comment.user_id;
        });

        return getUsersByIds(userIds)
            .then(function(users) {
             return {
                users: users,
                comments: comments,
             };
    });
    })
    .then(function(data) {
        var commentBlock = document.getElementById('comment-block')

        var html='';
        data.comments.forEach(function(comment) {
            var user = data.users.find(function(user) {
                return user.id === comment.user_id;
            })
            html += '<li>${user.name}: ${comment.content}';
        });
        commentBlock.innerHTML = html;
    });
