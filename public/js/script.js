var elems = document.querySelectorAll('.dropdown-trigger');
var instances = M.Dropdown.init(elems, {
    coverTrigger: false,
    hover: true,
});

//handle fetch request errors
function handleFetchErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}