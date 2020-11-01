export type LocalStateParams = {
  displayComponent: ROUTE_REGISTRY;
  id: string;
  scrollY: number;
  prevDisplayComponent: ROUTE_REGISTRY | null;
  prevId: string | null;
  prevScrollY: number | null;
};

export enum ROUTE_REGISTRY {
  folder,
  image,
  meta,
}

export enum COMMAND_REGISTRY {
  home,
  back,
  meta,
  favorite,
}
