document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/api/v1/notes')
  .then(x => x.json())
  .then(json => display(json))

  const container = document.getElementById('container')
  const postTitle = document.getElementById('postTitle')
  const postBody = document.getElementById('postBody')

  function display(json){
    json.forEach(function(json){
      container.innerHTML += (`
        <div id='wrap-${json.id}'>
          <h3 id='${json.id}'>${json.title}</h3>
          <div id='body-${json.id}'></div>
        </div>

        <button id='edit-${json.id}'>Edit</button>
        <button id='update-${json.id}'>Update</button>
        <button id='delete-${json.id}'>Delete</button>
        `)

      container.addEventListener('click', function(e){
        if(json.id === parseInt(e.target.id)){
            const description = document.createElement('p')
            const bodyID = document.getElementById(`body-${json.id}`)
            bodyID.innerHTML = `${json.body}`
        }
        editShit(json)
        deleteShit(json)
      })

      function editShit(json){
        const edit = document.getElementById(`edit-${json.id}`)
        const wrap = document.getElementById(`wrap-${json.id}`)
        edit.addEventListener('click', function(e){
          console.log('testing a thing')
          wrap.innerHTML = ''
          wrap.innerHTML += (`
            <br>
            <input id='newTitle-${json.id}' value='${json.title}'></input>
            <br>
            <input id='newBody-${json.id}' value='${json.body}'></input>
          `)
        })

        const update = document.getElementById(`update-${json.id}`)
        update.addEventListener('click', updateNote)


        function updateNote(e) {
          const newTitle = document.getElementById(`newTitle-${json.id}`)
          const newBody = document.getElementById(`newBody-${json.id}`)
          fetch(`http://localhost:3000/api/v1/notes/${json.id}`, {
            method: "PATCH",
            headers: {
              "Action": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: `${newTitle.value}`,
              body: `${newBody.value}`
            })
          })
        }
      }

      function deleteShit(json) {
        const del = document.getElementById(`delete-${json.id}`)
        del.addEventListener('click', function(e) {
          console.log('test')
          fetch(`http://localhost:3000/api/v1/notes/${json.id}`, {
              method: "DELETE",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              }
          })
        })
    }
  })


  const form = document.getElementById('form')
  form.addEventListener('submit', createNote)

  function createNote(e) {
    e.preventDefault()

    // container.innerHTML += (`
    //   <h3>${postTitle}</h3>
    //   <div><p>${postBody}</p></div>`
    // )
    fetch("http://localhost:3000/api/v1/notes", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: "1",
          title: `${postTitle.value}`,
          body: `${postBody.value}`
        })
    })
  }





  }



})
