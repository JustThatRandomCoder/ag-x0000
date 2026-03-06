// Router Configuration für Agora-Audioführung
// Alle 15 Stationen der Agora werden hier definiert

export interface Route {
  path: string;
  component: string;
  title: string;
  description?: string;
  stationNumber?: number;
  audioFile?: string;
}

export const agoraStations: Route[] = [
  {
    path: '/station-1',
    component: 'station-1',
    title: 'Station 1: Einleitung',
    description: 'Willkommen zur Agora-Audioführung - Einführung in das antike Zentrum Athens',
    stationNumber: 1,
    audioFile: '/audios/station-01.mp3'
  },
  {
    path: '/station-2', 
    component: 'station-2',
    title: 'Station 2: Stoa des Attalos',
    description: 'Die rekonstruierte hellenistische Säulenhalle und Museum',
    stationNumber: 2,
    audioFile: '/audios/station-02.mp3'
  },
  {
    path: '/station-3',
    component: 'station-3', 
    title: 'Station 3: Tempel des Hephaistos',
    description: 'Der besterhaltene dorische Tempel in Griechenland',
    stationNumber: 3,
    audioFile: '/audios/station-03.mp3'
  },
  {
    path: '/station-4',
    component: 'station-4',
    title: 'Station 4: Pantainos Bibliothek',
    description: 'Die antike Bibliothek und ihr Beitrag zur Bildung Athens',
    stationNumber: 4,
    audioFile: '/audios/station-04.mp3'
  },
  {
    path: '/station-5',
    component: 'station-5',
    title: 'Station 5: Mittel-Stoa',
    description: 'Die zentrale Säulenhalle als Handelszentrum der Agora',
    stationNumber: 5,
    audioFile: '/audios/station-05.mp3'
  },
  {
    path: '/station-6',
    component: 'station-6',
    title: 'Station 6: Tholos',
    description: 'Das runde Regierungsgebäude der athenischen Demokratie',
    stationNumber: 6,
    audioFile: '/audios/station-06.mp3'
  },
  {
    path: '/station-7',
    component: 'station-7',
    title: 'Station 7: Bouleuterion',
    description: 'Das Ratsgebäude des athenischen Senats',
    stationNumber: 7,
    audioFile: '/audios/station-07.mp3'
  },
  {
    path: '/station-8',
    component: 'station-8',
    title: 'Station 8: Metroon',
    description: 'Der Tempel der Mutter der Götter und Staatsarchiv',
    stationNumber: 8,
    audioFile: '/audios/station-08.mp3'
  },
  {
    path: '/station-9',
    component: 'station-9',
    title: 'Station 9: Hephaisteion',
    description: 'Der besterhaltene griechische Tempel des Schmiedegottes',
    stationNumber: 9,
    audioFile: '/audios/station-09.mp3'
  },
  {
    path: '/station-10',
    component: 'station-10',
    title: 'Station 10: Hellenistisches Gebäude',
    description: 'Architektur der hellenistischen Epoche in der Agora',
    stationNumber: 10,
    audioFile: '/audios/station-10.mp3'
  },
  {
    path: '/station-11',
    component: 'station-11',
    title: 'Station 11: Tempel des Apollon Patroos',
    description: 'Der Tempel des Stammvaters der Athener',
    stationNumber: 11,
    audioFile: '/audios/station-11.mp3'
  },
  {
    path: '/station-12',
    component: 'station-12',
    title: 'Station 12: Tempel und Altar des Ares',
    description: 'Dem Kriegsgott geweihter Tempelkomplex',
    stationNumber: 12,
    audioFile: '/audios/station-12.mp3'
  },
  {
    path: '/station-13',
    component: 'station-13',
    title: 'Station 13: Stoa des Zeus Eleutherios',
    description: 'Die Säulenhalle des Zeus des Befreiers',
    stationNumber: 13,
    audioFile: '/audios/station-13.mp3'
  },
  {
    path: '/station-14',
    component: 'station-14',
    title: 'Station 14: Altar der zwölf Götter',
    description: 'Das religiöse Zentrum und Nullpunkt des antiken Athens',
    stationNumber: 14,
    audioFile: '/audios/station-14.mp3'
  },
  {
    path: '/station-15',
    component: 'station-15',
    title: 'Station 15: Hagioi Apostoloi',
    description: 'Die byzantinische Kirche der Heiligen Apostel',
    stationNumber: 15,
    audioFile: '/audios/station-15.mp3'
  }
];

export const routes: Route[] = [
  {
    path: '/',
    component: 'index',
    title: 'Agora Audioführung',
    description: 'Startseite der Agora Audioführung'
  },
  ...agoraStations
];

// Navigation Links für Menüs
export const navLinks = routes.filter(route => route.path !== '/404');

// Helper Funktionen für Routing
export function getRouteByPath(path: string): Route | undefined {
  return routes.find(route => route.path === path);
}

export function getStationByNumber(number: number): Route | undefined {
  return agoraStations.find(station => station.stationNumber === number);
}

export function getRouteTitle(path: string): string {
  const route = getRouteByPath(path);
  return route ? route.title : '404';
}

export function generateSitemap(): string[] {
  return routes.map(route => route.path);
}

export function getNextStation(currentStation: number): Route | undefined {
  return agoraStations.find(station => station.stationNumber === currentStation + 1);
}

export function getPreviousStation(currentStation: number): Route | undefined {
  return agoraStations.find(station => station.stationNumber === currentStation - 1);
}