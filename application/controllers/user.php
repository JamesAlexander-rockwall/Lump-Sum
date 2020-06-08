<?php defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    public function __construct(){
        parent::__construct();
  		$this->load->helper('url');
  	 	$this->load->model('user_model');
        $this->load->library('session'); 
    }

    public function index()
    {
        if($this->session->userdata('user_name') == ''){
            $this->load->view("login");
        }else{
            redirect('home/index');
        }        
    }

    public function register()
    {
        $this->load->view("register");
    }

    function login_user(){ 
        $user_login=array(      
            'user_email'=>$this->input->post('user_email'),
            'user_password'=>md5($this->input->post('user_password'))      
        ); 
        $data['users']=$this->user_model->login_user($user_login['user_email'], $user_login['user_password']);  
        if(!$data['users']){
            $this->session->set_flashdata('error_msg', 'Ivaild email or password.');
            redirect('user/index'); 
        }else{
            $this->session->set_userdata('user_name',$data['users'][0]['user_name']);
            redirect('home/index');
        }             
              
    }      

    public function register_user(){
 
        $user=array(
            'user_name'=>$this->input->post('user_name'),
            'user_email'=>$this->input->post('user_email'),
            'user_password'=>md5($this->input->post('user_password'))
        );
   
        $name_check=$this->user_model->name_check($user['user_name']);
        $email_check=$this->user_model->email_check($user['user_email']);
   
        if($name_check && $email_check){
            $this->user_model->register_user($user);
            $this->session->set_flashdata('success_msg', 'Registered successfully.Now login to your account.');
            redirect('user/index');        
        }
        else{        
            $this->session->set_flashdata('error_msg', 'The email or name is duplicated.');
            redirect('user/register');       
        }
   
    }

    public function logout(){
        $this->session->sess_destroy();
        redirect('user/index');
    }
}

?>