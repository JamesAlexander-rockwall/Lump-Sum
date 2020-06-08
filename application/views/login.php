<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Lump Sum</title>

    <link href="<?php echo base_url()?>assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url()?>assets/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="<?php echo base_url()?>assets/css/animate.css" rel="stylesheet">
    <link href="<?php echo base_url()?>assets/css/style.css" rel="stylesheet">

</head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
              <h1 class="logo-name">LS</h1>
            </div>
            <p>Login in. To see it in action.</p>
            <?php
              $success_msg= $this->session->flashdata('success_msg');
              $error_msg= $this->session->flashdata('error_msg');
 
              if($success_msg){
                ?>
                <div class="alert alert-success">
                  <?php echo $success_msg; ?>
                </div>
              <?php
              }
              if($error_msg){
                ?>
                <div class="alert alert-danger">
                  <?php echo $error_msg; ?>
                </div>
                <?php
              }
            ?>
            <form class="m-t" role="form" method="post" action="<?php echo base_url('user/login_user'); ?>">
                <div class="form-group">
                    <input type="email" name="user_email" class="form-control" placeholder="Username"  required="">
                </div>
                <div class="form-group">
                    <input type="password" name="user_password" class="form-control" placeholder="Password" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>

                <a href="#"><small>Forgot password?</small></a>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="<?php echo base_url()?>user/register">Create an account</a>
            </form>
        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="<?php echo base_url()?>assets/js/jquery-3.1.1.min.js"></script>
    <script src="<?php echo base_url()?>assets/js/bootstrap.min.js"></script>

</body>

</html>
