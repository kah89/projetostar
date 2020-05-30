<?php
require_once("dbcontroller.php");
require_once("SimpleRest.php");



class LoginStarRestHandler extends SimpleRest
{
    
    
    
    public function validarLoginStar ()
    {
         

// verificar se existe o parâmetro txtnome
if (isset($_GET["txtemail"]))
  { 
    $email  = $_GET["txtemail"];
    $senha  = $_GET["txtsenha"];
        
    
   
    
    

$query =" declare @logado int,@usuario VARCHAR(100),@nomeusuario VARCHAR(100)
set @logado =(SELECT COUNT(*) FROM tbusuariosStar where EmailUsuario='{$email}' and SenhaUsuario='{$senha}');

if(@logado=0)
    begin
        set @logado=2
    end
else
    begin
        if(@logado=1)
            begin
            set @logado =(SELECT COUNT(*) FROM tbusuariosStar where Logado='1' and EmailUsuario='{$email}' and SenhaUsuario='{$senha}');
            end
    end
if(@logado=1)
begin
set @logado=3
end
else
begin
if(@logado=0)
begin
set @nomeusuario = (select NomeUsuario from tbusuariosStar where EmailUsuario='{$email}')
set @usuario = (select EmailUsuario from tbusuariosStar where EmailUsuario='{$email}')
set @logado=4
end
end
select @logado as 'logado', @usuario as 'usuario', @nomeusuario as 'nomeusuario';
if(@logado=4)
begin
update tbusuariosStar
set Logado='1'
where EmailUsuario='{$email}' and SenhaUsuario='{$senha}'
end";

    
    
    
   //echo  $query ;
    //instanciar a classe DBController
    $dbcontroller = new DBController();
    
    $rawData = $dbcontroller->executeSelectQuery($query);  
        
    
    //verificar se o retorno esta "vazio"
    /*if(empty($rawData))   
    {
        $rawData = array('success' => 0);        
    } else {
        $rawData = array('success' => 1);      
    }

    
    //apresentar os valores de um array
    print_r(array_values ($rawData)); */
        
    
    if(empty($rawData)) {
				$statusCode = 404;
				$rawData = array('success' => 0);		
			} else {
				$statusCode = 200;
			}
    
    $requestContentType = 'application/json';//$_POST['HTTP_ACCEPT'];
			$this ->setHttpHeaders($requestContentType, $statusCode);
			$result = $rawData;
					
			if(strpos($requestContentType,'application/json') !== false)
			{
				$response = $this->encodeJson($result);
				echo $response;
			}
    
    
  }
        
        
 }
    
    
    
        public function desconectarLogin ()
    {
         

// verificar se existe o parâmetro txtnome
if (isset($_GET["txtLogout"]))
  { 
    $email  = $_GET["txtLogout"];
   
        
    
    $query = " 
    declare @logado int, @acesso int
set @logado =(SELECT COUNT(*) FROM tbusuariosStar where Logado='1' and EmailUsuario='{$email}');
 if(@logado=1)
  begin
   update tbusuariosStar
   set Logado='0'
   where EmailUsuario='{$email}'
  end
  
  if(@logado=1)
  begin
    set @acesso =(SELECT COUNT(*) FROM tbusuariosStar where Logado='0' and EmailUsuario='{$email}');
   end
   
   if(@acesso=1)
    begin
     set @logado = 5;
    end
  
  
select @logado as 'logado' ;" ;
    

    
    //instanciar a classe DBController
    $dbcontroller = new DBController();
    
    $rawData = $dbcontroller->executeSelectQuery($query);  
        
    
    //verificar se o retorno esta "vazio"
    /*if(empty($rawData))   
    {
        $rawData = array('success' => 0);        
    } else {
        $rawData = array('success' => 1);      
    }

    
    //apresentar os valores de um array
    print_r(array_values ($rawData)); */
        
    
    if(empty($rawData)) {
				$statusCode = 404;
				$rawData = array('success' => 0);		
			} else {
				$statusCode = 200;
			}
    
    $requestContentType = 'application/json';//$_POST['HTTP_ACCEPT'];
			$this ->setHttpHeaders($requestContentType, $statusCode);
			$result = $rawData;
					
			if(strpos($requestContentType,'application/json') !== false)
			{
				$response = $this->encodeJson($result);
				echo $response;
			}
    
    
  }
        
        
 }
    
    
    
    
    
    
    
    
  public function encodeJson($responseData) 
	{
		$jsonResponse = json_encode($responseData);
		return $jsonResponse;		
	}  
     
    
}

if (isset($_GET["txtemail"])) 
	{
			
		$usuario = new LoginStarRestHandler() ;
		$usuario -> validarLoginStar();
			
	}






if (isset($_GET["txtLogout"])) 
	{
			
		$usuario = new LoginStarRestHandler ;
		$usuario -> desconectarLogin();
			
	}



?>