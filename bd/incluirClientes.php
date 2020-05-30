<?php 
require_once("dbcontroller.php");

require_once("SimpleRest.php");



class incluirClientesStarRestHandler extends SimpleRest 
{
    
    
public function cadastrarclientesStar ()    
        {
    
    
if (isset($_GET["txtNome"]))
                
            {
      
    $nome = $_GET["txtNome"];
    $sobrenome = $_GET["txtsobrenome"];
    $email = $_GET["txtemaildois"];
    $telefone = $_GET["txttelefone"];
    $cpf = $_GET["txtcpf"];
    $senha = $_GET["txtsenhadois"];
    $repetirsenha = $_GET["txtrepetirsenha"];
                
     
   //Instanciar a classe DBController
    $dbcontroller = new DBController();
		
     $query ="
			declare @codigo int
			set @codigo =(Select top(1)COD_CLIENTE from tbClientestar order by COD_CLIENTE desc)+1;
			select @codigo as 'Codigo';";
			
						
            $codigo = $dbcontroller->executeBuscaCodigoSelectQuery($query);
			
               
                
			if (is_null($codigo))
			{
				$codigo = 1;
			}
                
               
   $query = "INSERT INTO tbClientestar  (COD_CLIENTE,NOME,SOBRENOME,EMAIL,TELEFONE,CPF)VALUES   ('{$codigo}','{$nome}','{$sobrenome}','{$email}','{$telefone}','{$cpf}');
    
    INSERT INTO tbusuariosStar  (NomeUsuario,EmailUsuario,SenhaUsuario,Logado) VALUES ('{$nome}','{$email}','{$senha}','1')";
           
   
    
    $rawData = $dbcontroller->executeQuery($query);
    
   
                
                
    //Verificar se o retorno está "vazio"
   if(empty($rawData)) {
				$statusCode = 404;
				$rawData = array('sucesso' => 1);		
			} else {
				$statusCode = 200;
			}
                
    $requestContentType = 'application/json';//$_POST['HTTP_ACCEPT'];
			$this ->setHttpHeaders($requestContentType, $statusCode);
			//$result = $rawData;
            $result["RetornoDados"] = $rawData;	
					
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




if (isset($_GET["txtNome"]))
    {
			
		$usuario = new incluirClientesStarRestHandler() ;
		$usuario -> cadastrarclientesStar();

}






    ?>