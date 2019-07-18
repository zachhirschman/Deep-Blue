insert into issues(user_id,thumbnail,images,name,description,urgency,lat,long)
values($1,$2,$3,$4,$5,$6,$7,$8)

returning *;

