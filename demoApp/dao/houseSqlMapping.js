// dao/houseSqlMapping.js
var house = {
	insert:'insert into house(id, name, code, addr1, addr2, addr3, lng, lat, price, safety) values(0,?,?,?,?,?,?,?,?,?);',
	update:'update house set price=?, safety=? where id=?;',
	delete: 'delete from house where id=?;',
	queryById: 'select * from house where id=?;',
	queryByFilter: 'select * from house where name like ? and price>=? and price<=? ORDER BY ?;',
	queryAll: 'select * from house;'
};
 
module.exports = house;