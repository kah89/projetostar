<?php
 class DBController
  {

  public $conn;
  public $servidor = '10.38.40.194';
  public $instancia = "";
  public $porta = 1433;
  public $database = "bdstar";
  public $usuario = "Ti_78";
  public $senha = "sala21";

function connectDB(){
    

try{

    $this->conn = new PDO("sqlsrv:Server={$this->servidor}\\{$this->instancia},{$this->porta};Database={$this->database}", $this->usuario, $this->senha );
      
  }
      catch (Exception $e)
      {
          
          die( print_r( $e->getMessage() ) );
      }   
   

        
    }
function executeQuery($query) {
			$conn = $this->connectDB();    
			$result = $this->conn->prepare($query);

		if ($result->execute()) { 
			$result = array('sucesso'=>0);
		return $result;
		}



		}	
		function executeSelectQuery($query) {
			$conn = $this->connectDB(); 
			$result = $this->conn->query($query);

			while ( $row = $result->fetch( PDO::FETCH_ASSOC ) ){ 
			$resultset[] = $row;
		}	  
		if(!empty($resultset))
			return $resultset;
		}
		
		
		function executeBuscaCodigoSelectQuery($query) {
		
			$conn = $this->connectDB(); 
			$result = $this->conn->query($query);
				
			$row = $result->fetch( PDO::FETCH_ASSOC ) ;
				return $row['Codigo'];
		}

     
}



?>










































