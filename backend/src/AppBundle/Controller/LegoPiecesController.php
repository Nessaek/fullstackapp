<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\View\View;
use AppBundle\Entity\LegoPieces;

class LegoPiecesController extends FOSRestController {

     /**
     * @Rest\Get("/testing")
     */
      public function getAction()
      {
        $restresult = $this->getDoctrine()->getRepository('AppBundle:LegoPieces')->findAll();
          if ($restresult === null) {
            return new View("there are no LegoPiecess exist", Response::HTTP_NOT_FOUND);
       }



          return $restresult;
      }


      /**
     * @Rest\Get("/LegoPieces/{id}")
     */
     public function idAction($id)
     {
       $singleresult = $this->getDoctrine()->getRepository('AppBundle:LegoPieces')->find($id);
       if ($singleresult === null) {
       return new View("LegoPieces not found", Response::HTTP_NOT_FOUND);
       }
     return $singleresult;
     }


      /**
     * @Rest\Post("/LegoPieces")
     */
     public function postAction(Request $request)
     {
       $data = new LegoPieces;
       $piece = $request->get('piece');
       $type = $request->get('type');
     if(empty($piece) || empty($type))
     {
       return new View("NULL VALUES ARE NOT ALLOWED", Response::HTTP_NOT_ACCEPTABLE);
     }
      $data->setPiece($piece);
      $data->setType($type);
      $em = $this->getDoctrine()->getManager();
      $em->persist($data);
      $em->flush();
        //  $headers = $request->headers->all();
        //  var_dump($headers);
       return new View("LegoPieces Added Successfully", Response::HTTP_OK);
     }


      /**
     * @Rest\Put("/LegoPieces/{id}")
     */
     public function updateAction($id,Request $request)
     {
     $data = new LegoPieces;
     $piece = $request->get('piece');
     $type = $request->get('type');
     $sn = $this->getDoctrine()->getManager();
     $legoPieces = $this->getDoctrine()->getRepository('AppBundle:LegoPieces')->find($id);
    if (empty($legoPieces)) {
       return new View("LegoPieces not found", Response::HTTP_NOT_FOUND);
     }
    elseif(!empty($piece) && !empty($type)){
       $legoPieces->setpiece($piece);
       $legoPieces->setType($type);
       $sn->flush();

       return new View("LegoPieces Updated Successfully", Response::HTTP_OK);
     }
    elseif(empty($piece) && !empty($type)){
       $legoPieces->settype($type);
       $sn->flush();
       return new View("type Updated Successfully", Response::HTTP_OK);
    }
    elseif(!empty($piece) && empty($type)){
     $legoPieces->setpiece($piece);
     $sn->flush();
     return new View("LegoPieces piece Updated Successfully", Response::HTTP_OK);
    }
    else return new View("LegoPieces piece or type cannot be empty", Response::HTTP_NOT_ACCEPTABLE);
     }


      /**
     * @Rest\Delete("/LegoPieces/{id}")
     */
     public function deleteAction($id)
     {
      $data = new LegoPieces;
      $sn = $this->getDoctrine()->getManager();
      $legoPieces = $this->getDoctrine()->getRepository('AppBundle:LegoPieces')->find($id);
    if (empty($legoPieces)) {
      return new View("user not found", Response::HTTP_NOT_FOUND);
     }
     else {
      $sn->remove($legoPieces);
      $sn->flush();
     }
      return new View("deleted successfully", Response::HTTP_OK);
     }






}




?>
