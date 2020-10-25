insert into issues(user_id,thumbnail,images,name,description,urgency,lat,long,attendees,time_posted)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,now());

select * from issues;

