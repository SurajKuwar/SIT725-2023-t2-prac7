const clickMe = () => {
    console.log('clickMe clicked');
}

const addCards = (items) => {
    console.log(items);
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align" style="background-color: royalblue;"> <div class="card medium"   style="background-color: lightcyan;"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+ item.image +'"></img></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">'+ item.title +'<i class="material-icons right">more_vert</i></span><p><a href="#">Flavoured item</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span><p class="card-text">'+item.description+'</p></div></div></div>';
        $('#card-section').append(itemToAppend);
    });
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();

    console.log('form data: ', formData);
    addCat(formData);
}

const addCat = (cat) => {
    $.ajax({
        url:'api/cats',
        data: cat,
        type: 'Post',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    });

}

const getCats = () => {
    $.get('/api/cats',(response) => {
        if(response.statusCode === 200){
            addCards(response.data);
            console.log(response.data)
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();

    getCats();

    $('#formSubmit').click(()=>{
        submitForm();
    })
});