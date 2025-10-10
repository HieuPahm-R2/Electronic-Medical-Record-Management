package group29.hust.service;

import group29.hust.exception.BadActionException;

public interface ICrudService<T, K> {
    public T insert(T dto);

    public T getById(K id);

    public T update(T dto) throws BadActionException;

    public void delete(K id);

}
