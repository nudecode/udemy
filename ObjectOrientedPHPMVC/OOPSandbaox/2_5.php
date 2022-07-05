<?php
class User {
    private $name;
    private $age;

    public function __constrauct($name, $age){
        $this->name = $name;
        $this->age = $age;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name){
        $this->name = $name;
    }

    // __get MAGIC METOD

    public function __get($property){
        if(property_exists($this, $property)){
            return $this->$property;
        }
    }
}

$user1 = new User('John', 40);

// echo $user1->name;
// echo $user1 = 'name';

// echo $user1->setName('Jeff');
// echo $user1->getName();

echo 
