# GitHub SSH Key Setup

This guide provides instructions on how to set up an SSH key for your GitHub account, allowing you to securely connect and push code without entering your username and password every time.

## 1. Check for Existing SSH Keys

First, check if you already have an SSH key. Open your terminal and run:

```bash
ls -al ~/.ssh
```

If you see files named `id_rsa.pub`, `id_ecdsa.pub`, or `id_ed25519.pub`, you already have an SSH key and you can skip to step 3.

## 2. Generate a New SSH Key

If you don't have an SSH key, you can generate a new one. The recommended algorithm is Ed25519.

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

When you're prompted to "Enter a file in which to save the key," you can press Enter to accept the default file location (`~/.ssh/id_ed25519`).

You will also be asked to enter a secure passphrase. This is optional but highly recommended.

## 3. Add Your SSH Key to the ssh-agent

To ensure your key is available for SSH connections, you need to add it to the `ssh-agent`.

First, start the ssh-agent in the background:

```bash
eval "$(ssh-agent -s)"
```

Then, add your SSH private key to the ssh-agent. If you created a key with a different name, or if you are adding an existing key that has a different name, replace `id_ed25519` in the command with the name of your private key file.

```bash
ssh-add ~/.ssh/id_ed25519
```

## 4. Add the SSH Key to Your GitHub Account

Now, you need to add the public SSH key to your GitHub account.

First, copy the public key to your clipboard.

```bash
# For macOS
pbcopy < ~/.ssh/id_ed25519.pub

# For Linux (requires xclip)
sudo apt-get install xclip
xclip -sel clip < ~/.ssh/id_ed25519.pub
```

If you don't have `pbcopy` or `xclip`, you can open the file and copy the content manually:

```bash
cat ~/.ssh/id_ed25519.pub
```

Next, follow these steps on GitHub:

1.  Go to your GitHub account settings.
2.  In the "Access" section of the sidebar, click **SSH and GPG keys**.
3.  Click **New SSH key** or **Add SSH key**.
4.  In the "Title" field, add a descriptive label for the new key (e.g., "My MacBook Pro").
5.  In the "Key" field, paste your public key.
6.  Click **Add SSH key**.

## 5. Test Your SSH Connection

To verify that your SSH key is set up correctly, you can test your connection to GitHub.

```bash
ssh -T git@github.com
```

You may see a warning like this:

```
> The authenticity of host 'github.com (IP ADDRESS)' can't be established.
> ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
> Are you sure you want to continue connecting (yes/no)?
```

Verify that the fingerprint in the message you see matches GitHub's ED25519 public key fingerprint `SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU`, and then type `yes`.

If successful, you will see a message like this:

```
> Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

You are now ready to use SSH for your Git operations with GitHub.
