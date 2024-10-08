const title = document.getElementById('song-title');
const artist = document.getElementById('artist-name');
const addbutton = document.getElementById('add-button');
const ul = document.getElementById('songlist');

addbutton.addEventListener('click', ()=>{
    const newTitle = title.value;
    const newArtist = artist.value;

    const p = document.createElement('p');
    const small = document.createElement('small');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const li = document.createElement('li');
    li.append(p);
    li.append(small);
    li.append(div);
    li.append(button);

    console.log(li);

    p.innerHTML = newTitle;
    small.innerHTML = newArtist;
    button.innerHTML = "Delete";

    p.classList.add('song-title');
    small.classList.add('artist-name');
    button.classList.add('delete');
    div.classList.add('div');
    

    ul.append(li);

})

console.log(title, artist, addbutton)