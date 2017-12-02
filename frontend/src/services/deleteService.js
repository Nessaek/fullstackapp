const deleteService = {
  deleteLego(legoPart) {  
  fetch('http://localhost:8000/LegoPieces' + '/' + legoPart.id, {
    method: 'delete'
  })
  .then(response => response.json());
  console.log("piece successfully deleted")
  }

}

export default deleteService;
