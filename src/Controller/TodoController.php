<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo", name="todo")
*/
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(TodoRepository $todoRepository, EntityManagerInterface $entityManager)
    {
        $this->todoRepository= $todoRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/read", name="todo" , methods={"GET"})
     */
    public function index()
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach($todos as $todo){
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
       
    }


    /**
     * @Route("/create", name="todo_read", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content= json_decode($request->getContent());
        $form = $this->createForm(TodoType::class);
        $form->submit((array)$content);

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['text' => join("\n", $errors), 'level' => 'error'],
            ]);

        }

        $todo = new Todo();

        $todo->setName($content->name);
        $todo->setDescription($content->description);

        try{
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        }catch (Exception $exception){
          return $this-> json([
            'message'=> ['text' => 'Error no se a guardado en la base de datos','level'=>'error']    
          ]);
        }

         return $this->json([
            'todo'=> $todo->toArray(),
            'message'=> ['text' =>'Save Data','level'=>'success']
        ]); 
    }



    
    /**
     * @Route("/update/{id}", name="todo_update", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     * @param Todo $todo
     */
    public function update(Request $request, Todo $todo)
    {
        $content= json_decode($request->getContent());

        $form = $this->createForm(TodoType::class);
        $nonObject = (array)$content;
        unset($nonObject['id']);
        $form->submit($nonObject);


        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['text' => join("\n", $errors), 'level' => 'error'],
            ]);

        }

        if ($todo->getName() === $content->name && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => ['text' => 'There was no change to the To-Do. Neither the task or the description was changed.', 'level' => 'error']
            ]);
        }

        $todo->setName($content->name);
        $todo->setDescription($content->description);
        try{
            $this->entityManager->flush();
        }catch (Exception $exception){
         
            return $this->json([
                'message' => ['text' => 'No se pudo actualizar.', 'level' => 'error']
            ]);
        }

        return $this->json([
            'todo'    => $todo->toArray(),
            'message' => ['text' => 'Se actualizo el registro!', 'level' => 'success']
        ]);

    }


     /**
     * @Route("/delete/{id}", name="todo_delelete", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
      
        try{
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        }catch (Exception $exception){
            return $this->json([
                'message' => ['text' => 'El registro no se elimino.', 'level' => 'error']
            ]);
        }

        return $this->json([
            'message' => ['text' => 'Se ha eliminado!', 'level' => 'success']
        ]);

      
    }
}
