<?php
class User_model extends CI_model{
 
    public function register_user($user){  
        $this->db->insert('user', $user);    
    }

    public function login_user($email, $password){
        //$email,$pass
        $this->db->select('*');
        $this->db->from('user');
        $this->db->where('user_email',$email)->where('user_password',$password);
        $query=$this->db->get();

        if($query->num_rows()>0)
        {
            return $query->result_array();
        }
        else{
            return false;
        }       
    }

    public function name_check($name){    
        $this->db->select('*');
        $this->db->from('user');
        $this->db->where('user_name',$name);
        $query=$this->db->get();
        
        if($query->num_rows()>0){
            return false;
        }else{
            return true;
        }    
    } 

    public function email_check($name){    
        $this->db->select('*');
        $this->db->from('user');
        $this->db->where('user_email',$email);
        $query=$this->db->get();
        
        if($query->num_rows()>0){
            return false;
        }else{
            return true;
        }    
    } 
}
?>