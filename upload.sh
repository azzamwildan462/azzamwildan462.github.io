#log_save
date=$(date +%d/%m/%Y)
time=$(date +%H.%M.%S)
who=$(whoami)

os=$(inxi -S | awk '{for(i=1;i<=NF;i++)if($i=="Distro:")print $(i+1)}')
log="Last push: $date by $who from $os (free-systemd) at $time"

echo $log >> log.txt

date=$(date +%d%m%Y)
commit_msg="Update_$date"
git add .
git commit -m "$commit_msg"

remote=$(git branch -r | head -n 1 | awk -F/ '{print $1}')
branch=$(git branch -r | head -n 1 | awk -F/ '{print $2}')

git push $remote $branch