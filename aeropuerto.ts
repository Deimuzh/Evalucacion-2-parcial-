class Flight {
    constructor(public flightNumber: string, public destination: string) {}
  
    displayDetails(): string {
      return `Número de vuelo: ${this.flightNumber}, Destino: ${this.destination}`;
    }
  }
  
  class DomesticFlight extends Flight {
    constructor(flightNumber: string, destination: string, public country: string) {
      super(flightNumber, destination);
    }
  
    displayDetails(): string {
      return `${super.displayDetails()}, País: ${this.country} (Vuelo Nacional)`;
    }
  }
  
  class InternationalFlight extends Flight {
    constructor(flightNumber: string, destination: string, public continent: string) {
      super(flightNumber, destination);
    }
  
    displayDetails(): string {
      return `${super.displayDetails()}, Continente: ${this.continent} (Vuelo Internacional)`;
    }
  }
  
  class Airport {
    private static instance: Airport;
    private flightList: Flight[] = [];
  
    private constructor() {}
  
    static getInstance(): Airport {
      if (!Airport.instance) {
        Airport.instance = new Airport();
      }
      return Airport.instance;
    }
  
    addFlight(flight: Flight): void {
      this.flightList.push(flight);
    }
  
    showFlights(): void {
      console.log('Lista de vuelos:');
      this.flightList.forEach((flight) => {
        console.log(flight.displayDetails());
      });
    }
  }
  
  // Crear instancias de vuelos
  const domesticFlight = new DomesticFlight('POO 1', 'CIUDAD MANTA', 'País ECUADOR');
  const internationalFlight = new InternationalFlight('POO 3 ', 'CIUDAD PORTOVIEJO', 'Continente LATINO');
  
  // Obtener la única instancia del aeropuerto
  const airportInstance = Airport.getInstance();
  
  // Agregar vuelos a la lista utilizando la única instancia
  airportInstance.addFlight(domesticFlight);
  airportInstance.addFlight(internationalFlight);
  
  // Mostrar la lista de vuelos utilizando la única instancia
  airportInstance.showFlights();
  