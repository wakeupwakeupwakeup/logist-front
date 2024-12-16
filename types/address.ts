export type TAddress = {
  address: string;
  contacts: string;
  containers: {
    volume: number;
    count: number;
  };
  schedule: string[];
  id: number;
  truck: number;
  priority: number | null;
};
