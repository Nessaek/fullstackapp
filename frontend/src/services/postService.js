const postService = {
  postLego(piece,type){
    fetch("http://localhost:8000/LegoPieces", {
      method: 'POST',
      headers : {
        "Content-Type":"application/json"
        },
      body: JSON.stringify({
        "piece": piece,
        "type": type
        })
    })
      .then(function(response) {
        console.log("piece successfully added!")
    })
      .catch(function(err) {
        console.log("didn't work" + err)
      });
  }
}
export default postService;
