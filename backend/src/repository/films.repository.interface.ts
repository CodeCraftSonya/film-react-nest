export interface FilmsRepository<TFilm> {
  findById(id: string): Promise<TFilm | null>;
  save(film: TFilm): Promise<TFilm>;
}
