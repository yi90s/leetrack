USE leetrack
INSERT Users SET user_id = 1, email_address='test@gmail.com', username='test', password='$2a$10$y/RBVUpeEYKHdLNhbudqEOJecPi.JpK1JXc2ZotUNfxBnVMQ116Ty';

-- difficulties
insert Difficulties set difficulty_id = 1, name='Easy';
insert Difficulties set difficulty_id = 2, name='Medium';
insert Difficulties set difficulty_id = 3, name='Hard';

-- topics
insert Topics set topic_id = 1, name = 'Array';
insert Topics set topic_id = 2, name = 'Hash Table';

-- problems
insert Problems set problem_id = 1, name = 'Two Sum', difficulty_id = 1;

-- problemTopics
insert ProblemTopics set problem_id = 1, topic_id = 1;
insert ProblemTopics set problem_id = 1, topic_id = 2;

-- notes
insert Notes set note_id = 1, problem_id = 1, user_id = 1, content = 'use hashmap to reduce redundant calculation';

