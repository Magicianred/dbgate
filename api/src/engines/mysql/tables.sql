select 
	TABLE_NAME as pureName, 
	case when ENGINE='InnoDB' then CREATE_TIME else coalesce(UPDATE_TIME, CREATE_TIME) end as alterTime 
from information_schema.tables 
where TABLE_SCHEMA = '#DATABASE#' and TABLE_NAME =[OBJECT_NAME_CONDITION];