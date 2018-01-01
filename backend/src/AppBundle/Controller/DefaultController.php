<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Request\ParamFetcher;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;


use \DateTime;
use AppBundle\Entity\LegoPieces;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Rest\Get("/LegoPieces")
     */
    public function getAllLegoPieces()
    {
      $em = $this->getDoctrine()->getManager('default');
      $mi_repo = $em->getRepository('AppBundle:LegoPieces');
      $pieces = $mi_repo->findAll();

      $pieces_array = [];
   

      foreach ($pieces as $piece)
      {
        array_push($pieces_array, array(
          'id' => $piece->getId(),
          'piece' => $piece->getPiece(),
          'type' => $piece->getType(),
          'start_date' => $piece->getStartDate(),
          'end_date' => $piece->getEndDate()
        ));
      }

      if(empty($pieces_array)){
        return new JsonResponse("no pieces available",400);
      }

      return new JsonResponse($pieces_array, 200);
    }

    /**
     * @Rest\Get("/LegoPieces/{id}")
     */
    public function pieceAction($id)
    {
        $em = $this->getDoctrine()->getManager('default');
        $singleresult = $em->getDoctrine()->getRepository('AppBundle:LegoPieces')->find($id);
        if ($singleresult === null) {
            return new View("LegoPieces not found", Response::HTTP_NOT_FOUND);
        }
        return $singleresult;
    }

    /**
     * @Rest\Get("/LegoPieces/part/{piece}")
     */
    public function idAction($piece)
    {
        $singleresult = $this->getDoctrine()->getRepository('AppBundle:LegoPieces')->findOneBy(['piece' => $piece]);;
        if ($singleresult === null) {
            return new View("Lego Piece not found", Response::HTTP_NOT_FOUND);
        }
        return $singleresult;
    }


    /**
     * @Route("/LegoPieces")
     * @METHOD("POST")
     * @View()
     *
     * @Annotations\QueryParam(
     * name="piece", nullable=true, description="piece"
     * )
     * @Annotations\QueryParam(
     * name="type", nullable=true, description="type"
     * )
     * @Annotations\QueryParam(
     * name="startDate", nullable=true, description="Start Date YYYY-MM-DD HH:MM:SS (Should be in the future)"
     * )
     * @Annotations\QueryParam(
     * name="endDate", nullable=true, description="End Date YYYY-MM-DD HH:MM:SS (Should be no more than 3 weeks in the future)"
     * )
     */
    public function postAction(Request $request)
    {
        $piece = $request->get('piece');
        $type = $request->get('type');
        $start = $request->get('startDate');
        $end   = $request->get('endDate');
        $startDate = DateTime::createFromFormat('d/m/Y H:i A', $start);
        $endDate = DateTime::createFromFormat(' d/m/Y H:i A', $end);
        $em = $this->getDoctrine()->getManager('default');
        $data = new LegoPieces();
        $data->setPiece($piece);
        $data->setType($type);
        $data->setStartDate($startDate);
        $data->setEndDate($endDate);
        $em->persist($data);
        $em->flush();

        return new JsonResponse("LegoPieces Added Successfully", 200);
    }


    /**
     * @Rest\Put("/LegoPieces/{id}", requirements={"id"="\d+"}))
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
