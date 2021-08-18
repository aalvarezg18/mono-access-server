export interface IFileSeeder {
  main(): Promise<void>;
  fileName: string;
}
