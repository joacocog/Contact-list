<?php include 'includes/layout/header.php'; 
      include 'includes/functions/functions.php';  
?>

<?php 

    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

    if(!$id){
        die('Not valid');
    }

    $result = getContactEdit($id);

    $contact = $result->fetch_assoc();

?>

<div class="bar-container">
    <div class="container bar">
        <a href="index.php" class="btn return">Return</a>
    </div>
</div>

<div class="bg-yellow container shadow">
    <form id="contact" action="#">
        <legend>Edit Contact</legend>

        <?php include 'includes/layout/form.php'; ?>
    </form>
</div>

<?php include 'includes/layout/footer.php'; ?>