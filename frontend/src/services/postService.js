const postService = {
  postLego(startDate, endDate, piece,type){

    fetch("http://localhost:8000/LegoPieces", {
      method: 'POST',
      headers : {
        "Content-Type":"application/json"
        },
      body: JSON.stringify({
        "startDate": startDate,
        "endDate": endDate,
        "piece": piece,
        "type": type
        })
    })
      .then(function(response) {
        console.log(response)
        console.log("piece successfully added!")
    })
      .catch(function(err) {
        console.log("didn't work" + err)
      });
  }
}
export default postService;
