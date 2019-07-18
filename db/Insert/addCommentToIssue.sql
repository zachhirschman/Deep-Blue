update issues set comments = array_append(comments, $1)
where issue_id = $2;

select * from issues
where issue_id = $2;