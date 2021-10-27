
<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="150" style="float: right;" src="https://miriadax.net/miriadax-theme/images/custom/logo_miriadax_new.svg">

<br/><br/><br/>

# Módulo 5: Integración de ramas con sobreescritura y con sobreescritura interactivo, commit inicial de GitHub, .gitignore y comandos GIT: clone, remote y push - Entrega P2P: Rebase 1

## Objetivos
 * Continuar practicando con repositorios locales y remotos, commits y ramas, pero integrando con rebase.

## Descripción de la práctica

Reutilizar la cuenta y el repositorio my_calculator en GitHub tal y como quedó en la entrega anterior. Crear una nueva rama que parta del primer commit de main "x^3 button" con el nombre "ops". Crear dos commits en la nueva rama "ops", el primero añade el botón x^2 y el segundo con el botón 1/x. Integrar la nueva rama ops en la rama main utilizando "git rebase ...".

Para terminar se deben subir los nuevos commits integrados en la rama "main" a un nuevo repositorio en su cuenta de GitHub, denominado "my_calculator_2".

El grafo de commits es más fácil de seguir cuando se integra con rebase, ya que todos los commits de la rama lateral pasan a main y todo queda en main. En cambio se pierde algo de la historia del proyecto, porque desaparecen las ramas laterales donde se suelen desarrollar las nuevas funcionalidades. Aunque no lo vamos a ver hasta la entrega 4, rebase tiene además la opción interactiva que permite rehacer la rama que se integra y sus commits. Por esta razón hay personas que prefieren el rebase frente al merge para integrar desarrollos.

¡Cuidado! Las ramas que se hayan compartido con terceros no deben modificarse con rebase, porque si un tercero ha descargado la rama, deberá repetir el rebase en su repositorio local. 

## Tareas a realizar

### Paso 1: Clonar el repositorio "my calculator"

El primer paso será clonar en un repositorio local el repositorio "my_calculator" de GitHub en un directorio "my_calculator_2". Se debe haber terminado el desarrollo de la práctica anterior previamente a la realización de esta entrega.

```
$ git clone git@github.com:<mi_usuario_de_github>/my_calculator   my_calculator_2 
``` 

### Paso 2: Nueva rama

El siguiente paso será crear una rama de nombre "ops" que comience después del primer commit (con mensaje "x^3 button") de la rama "main" y restaurarla en el directorio de trabajo, para poder trabajar sobre ella. Es necesario consultar el id del commit  "x^3 button" para poder crear la rama a partir del mismo

```
$ git log --oneline # Lista los commits existentes incluyendo su id
$ git checkout -b ops <id_de_commit> # Crea una nueva rama llamada "ops" a partir del commit indicado
```


### Paso 3: Funcionalidad x^2
Crear un commit en la rama "ops", que añada a la calculadora del fichero index.html el botón x^2 que eleve un número al cuadrado.

```
<!DOCTYPE html>
<html>
	<head>
		<title>Calculator</title>
		<meta charset="utf-8">
	</head>
	<body>
		<h1>Calculadora de ……su nombre y apellidos……</h1>
		Number:
		<input type="text" id="n1">
		<p>
			<button onclick="square()"> x^2 </button>
			<button onclick="cube()"> x^3 </button>
		</p>
		<script type="text/javascript">
			function cube() {
				var num = document.getElementById("n1");
				num.value = Math.pow(num.value, 3);
			}
			function square() {
				var num = document.getElementById("n1");
				num.value = Math.pow(num.value, 2);
			}
		</script>
	</body>
</html>
```

Una vez añadido el código del nuevo nuevo botón a la calculadora, comprobar que funciona correctamente, registrar los cambios en el índice y crear el nuevo commit.

```
$ git add index.html
$ git commit -m "x^2 button"
```
### Paso 3: Funcionalidad 1/x

Crear un commit en la rama "ops", que añada a la calculadora del fichero index.html el botón 1/x que divida 1 entre el número introducido.

```
<!DOCTYPE html>
<html>
	<head>
		<title>Calculator</title>
		<meta charset="utf-8">
	</head>
	<body>
		<h1>Calculadora de ……su nombre y apellidos……</h1>
		Number:
		<input type="text" id="n1">
		<p>
			<button onclick="inverse()"> 1/x </button>
			<button onclick="square()"> x^2 </button>
			<button onclick="cube()"> x^3 </button>
		</p>
		<script type="text/javascript">
			function cube() {
				var num = document.getElementById("n1");
				num.value = Math.pow(num.value, 3);
			}
			function square() {
				var num = document.getElementById("n1");
				num.value = Math.pow(num.value, 2);
			}
			function inverse() {
				var num = document.getElementById("n1");
				num.value = 1/num.value;
			}
		</script>
	</body>
</html>
```

Una vez añadido el código del nuevo nuevo botón a la calculadora, comprobar que funciona correctamente, registrar los cambios en el índice y crear el nuevo commit.

```
$ git add index.html
$ git commit -m "1/x button"
```

### Paso 4: Integrar la rama "ops" en "main"

Integrar la rama ops en la rama main con "git rebase" para crear una calculadora con cinco
botones: x^2, x^3, x^4, sin(x) y 1/x. 

"git rebase …" realiza la integración ejecutando un bucle, donde cada iteración traslada un commit de la rama origen a su nueva base. El traslado implica integrar el código del commit con el de su nueva base. Si la integración tiene conflictos, git indica el error y finaliza. 

"git status" muestra los ficheros con conflictos. Los conflictos deben resolverse entonces con el editor. 

Primero comprobamos el id del commit que queremos integrar en main (el de "1/x button")
```
git log --oneline
```

Nos cambiamos a la rama "main" y ejecutamos

```
$ git checkout main
$ git rebase <id del commit>
```

Como hemos modificado el mismo fichero y las mismas líneas que en los commits posteriores de la rama "main" surgirán conflictos.
Debemos editar el fichero index.html para eliminar los conflictos. 

Una vez resueltos, se debe comprobar primero que la integración funciona correctamente. Después se debe continuar la integración (rebase) añadiendo los cambios al índice y continuando el rebase:

```
$ git add .
$ git rebase --continue
```

Una vez generado un commit, git pasa a intentar integrar el siguiente de la rama origen. Y así hasta el último de la rama origen. 
Este proceso habrá que repetirlo dos veces: la primera vez para el botón x^4 y la segunda para el botón sin(x).

El resultado final de index.html tendrá los 5 botones: x^2, x^3, x^4, sin(x) y 1/x.

### Paso 5: Subir todas las ramas del repositorio local a un nuevo repositorio en GitHub.

Creamos un nuevo repositorio en Github llamado "my_calculator_2". Por último, subimos los cambios realizados en ambas ramas a Github.

```
$ git remote set-url origin git@github.com:<mi_usuario_de_github>/my_calculator_2
$ git push --all
```

La opción --force o -f permite subir un repositorio incompatible, pero ¡Cuidado borra el existente! Se debe utilizar solo en casos en que no hay otra solución.


## Prueba de la práctica

Para ayudar al desarrollo, se provee una herramienta de autocorrección que prueba las distintas funcionalidades que se piden en el enunciado. Para utilizar esta herramienta debes tener node.js (y npm) ([https://nodejs.org/es/](https://nodejs.org/es/)) y Git instalados. Primero ejecute los siguientes comandos **en un directorio diferente al de la práctica**:

```
$ git clone git@github.com:ging-moocs/MOOC_git_mod5-rebase1_entrega
$ cd MOOC_git_mod4-merge_entrega
$ npm install
```

A continuación guarde en un fichero llamado 'git_account' su nombre de usuario de GitHub
```
echo "mi_nombre_de_usuario_en_github" >> git_account
```

Para instalar y hacer uso de la [herramienta de autocorrección](https://www.npmjs.com/package/autocorector) en el ordenador local, ejecuta los siguientes comandos en el directorio del proyecto:

```
$ sudo npm install -g autocorector  ## Instala el programa de test
$ autocorector                      ## Pasa los tests al fichero a entregar
............................        ## en el directorio de trabajo
... (resultado de los tests)
```
También se puede instalar como paquete local, en el caso de que no se dispongas de permisos en el ordenador desde el que estás trabajando:
```
$ npm install autocorector     ## Instala el programa de test
$ npx autocorector             ## Pasa los tests al fichero a entregar
............................   ## en el directorio de trabajo
... (resultado de los tests)
```

Se puede pasar la herramienta de autoorrección tantas veces como se desee sin ninguna repercusión en la calificación.

## Instrucciones para la Entrega y Evaluación.

Una vez satisfecho con su calificación, el alumno puede subir su entrega a MiriadaX con el siguiente comando:
```
$ autocorector --upload
```
o, si se ha instalado como paquete local:
```
$ npx autocorector --upload
```

La herramienta de autocorrección preguntará por el correo del alumno y el token de MiriadaX. En [este enlace](https://docs.google.com/presentation/d/e/2PACX-1vRYA9npW0Xg_c6_SWg2jAU7L2ti83-GY1VYKTzM1U5AgsW-0BC3xbwi__gsrsZ50Md0ja2HyadNzEPn/pub?start=false&loop=false&delayms=5000) se proveen instrucciones para encontrar dicho token.

**RÚBRICA:** La resolución de cada uno de estos puntos dará un el % indicado de la nota total: 
* **10%:**  Existe el repositorio my_calculator2
* **30%:**  Los tres primeros commits de main son los originales: "x^3 button", "x^4 button" y "sin(x) button"
* **30%:**  El cuarto commit de la rama main es "x^2 button" y contiene lo pedido
* **30%:**  El quinto commit de la rama main es "1/x button" y contiene lo pedido


