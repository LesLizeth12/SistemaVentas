import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/alertify.service';
import { DetalleVenta } from 'src/app/models/DetalleVentaModel';
import { Persona } from 'src/app/models/PersonaModel';
import { Producto } from 'src/app/models/ProductoModel';
import { Usuario } from 'src/app/models/UsuarioModel';
import { Venta } from 'src/app/models/VentaModel';
import { DetalleventaService } from 'src/app/services/detalleventa.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-gestionreporte',
  templateUrl: './gestionreporte.component.html',
  styleUrls: ['./gestionreporte.component.css'],
})
export class GestionreporteComponent implements OnInit {
  ventas: Venta[] = [];
  usuarios: Usuario[] = [];
  clientes: Persona[] = [];
  personas: Persona[] = [];
  detalles:DetalleVenta[]=[];
  productos: Producto[] = [];
  ventasCombinadas: any[] = [];
  detallesCombinados: any[] = [];
  constructor(
    private ventaService: VentaService,
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private detalleventaService: DetalleventaService,
    private productoService: ProductoService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.loadVentas();
    this.loadClientes();
    this.loadUsuarios();
    this.loadPersons();
    //this.combineData(); 
  }

  loadVentas() {
    this.ventaService.getVentas().subscribe(
      (response) => {
        this.ventas = response;
        this.combineData();
        console.log(response);
      },
      (error) => console.error('Error al cargar las categorias', error)
    );
  }

  loadClientes(): void {
    this.personaService.getClients().subscribe(
      //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.clientes = response;
        this.combineData();
        console.log(response);
      },
      (error) => console.error('error en el loading', error)
    );
  }
  loadUsuarios(): void {
    this.usuarioService.getUsers().subscribe(
      (response) => {
        this.usuarios = response;
        this.combineData();
      },
      (error) => console.error('error en el loading', error)
    );
  }

  loadPersons(): void {
    this.personaService.getPersons().subscribe(
      (response) => {
        this.personas = response;
        this.combineData(); // Combina los datos después de cargar las personas
      },
      (error) => console.error("error en el loading", error)
    );
  }

  combineData(): void {
    this.ventasCombinadas = this.ventas.map((venta) => {
      // Encuentra el usuario asociado a la venta
      const usuario = this.usuarios.find((u) => u.id === venta.id_usuario);
  
      // Encuentra la persona asociada al usuario
      const personaUsuario = usuario
        ? this.personas.find((p) => p.id === usuario.id_persona) || null
        : null;

      // Encuentra el cliente asociado a la venta
      const cliente = this.clientes.find((c) => c.id === venta.id_cliente);
  
      // Retorna el objeto combinado con los datos necesarios
      return {
        ...venta, // Copia los datos de la venta
        nombresCliente: cliente?.nombres ?? 'Sin Cliente', // Nombre del cliente
        nombresUsuario: personaUsuario?.nombres ?? 'Sin Usuario', // Nombre del usuario
      };
    });
  
    // Imprime las ventas combinadas para verificar el resultado
    console.log('Ventas Combinadas:', this.ventasCombinadas);
  }

}
