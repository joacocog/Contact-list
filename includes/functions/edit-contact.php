<?php 

if($_POST['action'] == 'edit'){

    require_once('db.php');

    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $company = filter_var($_POST['company'], FILTER_SANITIZE_STRING);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);

    try{
        $stmt = $conn->prepare("UPDATE contacts SET name = ?, company = ?, phone = ? WHERE id = ?");
        $stmt->bind_param("sssi", $name, $company, $phone, $id);
        $stmt->execute();
        if($stmt->affected_rows == 1){
            $answer = array(
                'answer' => 'success'
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