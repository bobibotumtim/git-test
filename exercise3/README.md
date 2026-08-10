# Exercise 3 - Git and GitHub

Git đã được cài đặt trên máy:

```text
git version 2.51.0.windows.1
```

## Các lệnh Git cơ bản

```powershell
git --version
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

git init
git status
git add .
git commit -m "Initial Setup"

git branch new-branch
git checkout new-branch
git checkout -b another-branch
git merge new-branch

git log --oneline
git revert <commit-hash>
```

## Kết nối GitHub

Tạo một repository trên GitHub, sau đó chạy:

```powershell
git remote add origin <repository-url>
git push -u origin main
```

Clone một repository có sẵn:

```powershell
git clone <repository-url>
```

Repository của Exercise 3 đã được khởi tạo cục bộ. Phần `remote` và `push` cần URL repository GitHub của người dùng.
