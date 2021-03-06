class User < ActiveRecord::Base
	attr_reader :password
	validates :username, :email, :session_token, :password_digest, presence: true
	# DISABLE FOR RAKE SEED
	# validates :password, length: { minimum: 6 }

	has_many(
		:photos,
		class_name: "Photo",
		foreign_key: :user_id,
		primary_key: :id,
		dependent: :destroy
	)

	has_many(
		:likes,
		class_name: "Like",
		foreign_key: :user_id,
		primary_key: :id,
		dependent: :destroy
	)

	after_initialize :ensure_session_token

	def self.find_by_credentials(email, password)
		user = User.find_by_email(email)
		user && user.is_password?(password) ? user : nil
	end

	def self.generate_session_token
		SecureRandom::urlsafe_base64(16)
	end

	def reset_session_token!
		self.session_token = self.class.generate_session_token
		self.save!
		self.session_token
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	private

	def ensure_session_token
		self.session_token ||= SecureRandom::urlsafe_base64(16)
	end



end
