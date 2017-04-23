ALTER TABLE `problems`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `problem_tags`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_problem_status`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `submissions`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `submission_case`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `c_submission_case`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `submission_code`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `c_submission_code`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `temp_user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contest`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contest_participants`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contest_problems`
MODIFY `pname` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contest_rank`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;



ALTER TABLE `contest_submissions`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contest_clarifications`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `user_problem_status`
ADD CONSTRAINT `unique_user_problem_status`
UNIQUE(`pid`);



ALTER TABLE `problem_tags`
ADD CONSTRAINT `fk_problem_tags` 
FOREIGN KEY(`pid`) 
REFERENCES `problems`(`id`) 
ON DELETE CASCADE;

ALTER TABLE `submission_case`
ADD CONSTRAINT `fk_submission_case`
FOREIGN KEY(`sid`)
REFERENCES `submissions`(`id`)
ON DELETE CASCADE;

ALTER TABLE `submission_code`
ADD CONSTRAINT `fk_submission_code`
FOREIGN KEY(`sid`)
REFERENCES `submissions`(`id`)
ON DELETE CASCADE;


ALTER TABLE `contest_clarifications`
ADD CONSTRAINT `fk_contest_clarifications`
FOREIGN KEY(`cid`)
REFERENCES `contest`(`id`)
ON DELETE CASCADE;

ALTER TABLE `contest_participants`
ADD CONSTRAINT `fk_contest_participants`
FOREIGN KEY(`cid`)
REFERENCES `contest`(`id`)
ON DELETE CASCADE;

ALTER TABLE `contest_problems`
ADD CONSTRAINT `fk_contest_problems`
FOREIGN KEY(`cid`)
REFERENCES `contest`(`id`)
ON DELETE CASCADE;

ALTER TABLE `contest_rank`
ADD CONSTRAINT `fk_contest_rank`
FOREIGN KEY(`cid`)
REFERENCES `contest`(`id`)
ON DELETE CASCADE;

ALTER TABLE `contest_submissions`
ADD CONSTRAINT `fk_contest_submissions`
FOREIGN KEY(`cid`)
REFERENCES `contest`(`id`)
ON DELETE CASCADE;

ALTER TABLE `c_submission_case`
ADD CONSTRAINT `fk_c_submission_case`
FOREIGN KEY(`sid`)
REFERENCES `contest_submissions`(`id`)
ON DELETE CASCADE;

ALTER TABLE `c_submission_code`
ADD CONSTRAINT `fk_c_submission_code`
FOREIGN KEY(`sid`)
REFERENCES `contest_submissions`(`id`)
ON DELETE CASCADE;



