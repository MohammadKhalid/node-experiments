console.log('Before');
getUser(1, (user) => {
    console.log('User', user);
    //get repos
    getRepositories(user.username, (repos) => {
        console.log('User repos', repos);
    });
});
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Getting user...');
        callback({id: id, username:'khalid'});
    }, 2000);
};

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Getting repos...')
        callback({username: username, repos:['repo1', 'repo2', 'repo3']});
    }, 2000);
}