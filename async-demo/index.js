console.log('Before');
getUser(1, printUsers);
console.log('After');

function printRepos(repos) {
    console.log('User repos', repos);
}

function printUsers(user) {
    console.log('User', user);
    getRepositories(user.username, printRepos);
}

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