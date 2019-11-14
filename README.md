# PROYECTO "Flippi BAR"

[![FlippiBar](https://i.ibb.co/JnjprsX/Screenshot-at-Nov-14-13-51-26.png "FlippiBar")](https://i.ibb.co/JnjprsX/Screenshot-at-Nov-14-13-51-26.png "FlippiBar")
 
## ¿Qué es?
El proyecto consiste en desarrollar una aplicacion web para gestión y control del uso de las mesas y los pedidos de los clientes de un bar. A su vez proporciona información para la gestión del comercio.

## Tecnologia
El proyecto es desarrollado con [Angular 8](https://angular.io/ "Angular "), utilizando como backend [PHP](https://firebase.google.com/ "Firebase") y base de datos [MySQL](https://firebase.google.com/ "Firebase").

***

### Perfiles de usuarios:
- ##### Socio
- ##### Mozo
- ##### Cocinero
- ##### Cervecero
- ##### Bartender
- ##### Cliente

***

# Funcionalidades:

## SOCIO (ADMIN)

![ADMIN](https://i.ibb.co/z8svDWR/2.png)

 - ##### Tiene todos los mismos permisos del mozo para gestionar los pedidos, excepto el de Cobrar. En su lugar es tiene la función de cerrar la mesa para que quede en estado Libre.
 - ##### Registrar empleados con sus respectivos perfiles.
 - ##### Descargar en pdf con los datos de los empleados.
 - ##### Descargar el excel con los datos de los empleados.

## MOZO

![MOZO](https://i.ibb.co/LRLHgkM/3.png)
 - ##### Visualizar el estado de cada mesa. Libre, esperando, comiendo y pagando.
 - ##### Cargar una nueva comanda asociada a una mesa. Dicha comanda tiene todos los pedidos hechos por el cliente.
 - ##### Cargar cada pedido del cliente de forma independiente para poder gestionarlo en distintos momentos: Modiricarlo o eliminarlo mientras no haya sido derivado al sector (cocina, bar, cervecería), derivarlo al sector cuando quiera que se ponga en marcha, y entregarlo cuando todos los sectores involucrados en el pedido hayan modificado el estado a Listo.
 - ##### Visualizar el detalle del valor de cada producto, cantidad y el monto gastado.
 - ##### Cuando el cliente solicita pagar, el mozo debe modificar el estado de la mesa a Cobrar para que el socio cobre y cierre la mesa.
 

## COCINERO | BARTENDER | CERVECERO

![COCINERO](https://i.ibb.co/WHg1qY1/4.png)
 - ##### Visualizar la lista de pedidos que tiene en pendiente. Puede colocar el tiempo estimado en minutos. Cuando lo ponga en marcha debe cambiar su estado a En Preparación.
 - ##### Visualizar la lista de pedidos en preparacion. Cuando termine de prepararlo debe cambiar su estado a Listo para servir.
 - ##### Visualizar la lista de pedidos listos que no hayan sido entregados por el mozo.


## CLIENTE

![CLIENTE](https://i.ibb.co/ydZf0CG/6.png)

 - ##### Ingresar a la aplicacion como cliente registrado.
 - ##### Visualizar su comanda con el codigo obtenido por el Mozo. Podrá visualizar el detalle de cada pedido y del monto total gastado hasta el momento.
 - ##### Completar una encuesta sobre los distintos aspectos del restaurant.

## PERFIL

![PERFIL](https://i.ibb.co/f4YBG8d/5.png)

 - ##### Visualizar al cliente logueado con sus datos.
 - ##### Visualizar Rol y permisos.
 
