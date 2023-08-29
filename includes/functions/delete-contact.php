<?php 

if($_GET['action'] == 'delete'){
    // Delete contact from DB

    require_once('db.php');

    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

    try{
        $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if($stmt->affected_rows == 1){
            $answer = array(
                'answer' => 'succesfully'
            );
        }
        $stmt->close();
        $conn->close();
    }catch(Exception $e){
        $answer = array(

            'error' => $e->getMessage()
        );
    }
 
    echo json_encode($answer);
}

?>